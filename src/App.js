import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minHeight: '75px',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const styles = {
    overflowWrap: 'break-word',
  };

  const buttonStyles = {
    textAlign: '-webkit-right',
  };
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 599 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 959 });

  const onSubmit = (data) => {
    if (editNoteId) {
      const updatedNotes = notes.map((note) =>
        note.id === editNoteId ? { ...note, content: data.content } : note
      );
      setNotes(updatedNotes);
      setEditNoteId(null);
      reset({content: ''});
    } else {
      const newNote = {
        id: uuidv4(),
        content: data.content,
      };
      setNotes([...notes, newNote]);
      reset();
    }
  };

  const handleEditNote = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    setEditNoteId(noteId);
    reset({ content: noteToEdit.content });
  };

  const handleDeleteNote = (noteId) => {
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNotes);
  };

  return (
    <Container maxWidth={isTablet? "sm" : "lg"} className={classes.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Responsive Notes App
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField

          {...register('content')}
          label="Type your Note below"
          variant="outlined"
          multiline
          rows={isMobile ? 2 : 4}
          fullWidth
          required
        />
        <div style={buttonStyles}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {editNoteId ? 'Save Note' : 'Add Note'}
          </Button>
          {editNoteId && (
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => {
                setEditNoteId(null);
                reset({content: ''});
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={isTablet ? 6 : 4} key={note.id}>
            <div style={styles} className="any">
            <div >
              <Paper className={classes.paper}>
                <Typography variant="body1">{note.content}</Typography>
                <div style={buttonStyles} className="hoveredButton">
                <IconButton
                  aria-label="Edit"
                  color="primary"
                  onClick={() => handleEditNote(note.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <DeleteIcon />
                </IconButton>
                </div>
              </Paper>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
