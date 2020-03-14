import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppBar, Typography, Toolbar, Paper } from '@material-ui/core';
import { Container, Row, Col} from 'react-bootstrap';
import './App.css'

const App = () => {
  const [movie, setMovie] = useState(undefined);

  useEffect(() => {
    fetch('http://localhost:9292/movies/')
    .then(res => res.json())
    .then(json => setMovie(json))
  },[]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Denzel
          </Typography>
        </Toolbar>
      </AppBar>
      {
        movie && <Container>
        <Row className="row">
          <Col md={8} sm={12}>
            <Paper elevation={3} className="info" >
              <Typography variant="h3" >{movie.title}</Typography>
              <Typography variant="h5" className="space">{movie.synopsis}</Typography>
              <Typography variant="h6">Année : {movie.year}</Typography>
              <Typography variant="h6">Note : {movie.rating}</Typography>
              <Typography variant="h6">Nombre de vote : {movie.votes}</Typography>
            </Paper>
          </Col>
          <Col md={4} sm={12}>
            <img src={movie.poster}/>
          </Col>
        </Row>
      </Container>
      }
  </>
  );
}

export default App;
