package main

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {

	// db connect
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	handler := postgres{db: dbpool}
	defer dbpool.Close()

	r := chi.NewRouter()

	// middlewares
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
	}))

	// timeout
	r.Use(middleware.Timeout(60 * time.Second))

	r.Route("/palettes", func(r chi.Router) {
		r.Post("/create", handler.CreatePalette)
		r.Get("/", handler.GetPalettes)
	})

	http.ListenAndServe(":3001", r)
}

type postgres struct {
	db *pgxpool.Pool
}

type palette struct {
	Id      int
	Title   string
	Colours []string
}

// create a palette in db
func (pg postgres) CreatePalette(w http.ResponseWriter, r *http.Request) {

	decoder := json.NewDecoder(r.Body)
	var p palette

	// get data from body
	err := decoder.Decode(&p)
	if err != nil {
		panic(err)
	}

	if p.Title == "" {
		w.WriteHeader(400)
		w.Write([]byte("No title provided"))
		return
	}

	if len(p.Colours) == 0 {
		w.WriteHeader(400)
		w.Write([]byte("No colours provided"))
		return
	}

	_, err2 := pg.db.Exec(context.Background(), "INSERT INTO palettes (title, colours) VALUES ($1, $2)", p.Title, p.Colours)
	if err2 != nil {
		panic(err2)
	}
}

// return palettes
func (pg postgres) GetPalettes(w http.ResponseWriter, r *http.Request) {

	query := "SELECT * FROM palettes LIMIT 10 OFFSET $1"
	offset := 0

	// add url param
	offsetParam := r.URL.Query().Get("offset")
	if offsetNum, err := strconv.Atoi(offsetParam); offsetParam != "" && err == nil {
		offset = offsetNum
	}

	// get rows
	rows, err := pg.db.Query(context.Background(), query, offset)
	if err != nil {
		panic(err)
	}

	// put row info into palettes array
	var palettes []palette
	for rows.Next() {
		var temp palette
		err := rows.Scan(&temp.Id, &temp.Title, &temp.Colours)
		if err != nil {
			panic(err)
		}

		palettes = append(palettes, temp)
	}

	if err := rows.Err(); err != nil {
		panic(err)
	}

	render.JSON(w, r, palettes)
}
