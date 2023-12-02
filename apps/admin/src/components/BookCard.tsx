import { Typography } from "@mui/material";
import { Book, UpdateBookInput } from "../api/graphql/generated";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { CardTitle } from "./CardTitle";
import BaseBookCard from "./BaseBookCard";
import BookCardMenu from "./BookCardMenu";

interface BookCardProps {
  book: Book;
  handleUpdateBook: (input: UpdateBookInput) => Promise<void>;
  handleClickOpen: (book: Book) => void;
  handleDeleteBook: (id: string) => Promise<void>;
  updateBookLoading: boolean;
  deleteBookLoading: boolean;
}

const BookCard = ({
  book,
  handleUpdateBook,
  handleClickOpen,
  handleDeleteBook,
  updateBookLoading,
  deleteBookLoading,
}: BookCardProps) => {
  const handleUpdateBookFavourite = () => {
    handleUpdateBook({
      id: book.id,
      favourite: !book.favourite,
    });
  };

  return (
    <BaseBookCard
      book={book}
      cardContent={
        <>
          <CardTitle variant="subtitle1">{book.title}</CardTitle>
          <Typography variant="body2" color="text.secondary">
            {book.authors && book.authors[0]}
          </Typography>
        </>
      }
      cardActions={
        <>
          <IconButton
            aria-label="add to favorites"
            onClick={handleUpdateBookFavourite}
          >
            {book.favourite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <BookCardMenu
            book={book}
            handleClickOpen={handleClickOpen}
            updateBookLoading={updateBookLoading}
            deleteBookLoading={deleteBookLoading}
            handleUpdateBook={handleUpdateBook}
            handleDeleteBook={handleDeleteBook}
          />
        </>
      }
    />
  );
};

export default BookCard;