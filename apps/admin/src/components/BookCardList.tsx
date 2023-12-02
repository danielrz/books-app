import { Stack, useMediaQuery, useTheme } from "@mui/material";
import BookCard from "./BookCard";
import { Book, UpdateBookInput } from "../api/graphql/generated";
import BookCardSkeleton from "./BookCardSkeleton";

interface BookCardListProps {
  loading: boolean;
  books: Book[];
  handleClickOpen: (book: Book) => void;
  updateBookLoading: boolean;
  deleteBookLoading: boolean;
  handleUpdateBook: (input: UpdateBookInput) => Promise<void>;
  handleDeleteBook: (id: string) => Promise<void>;
}

const BookCardList = ({
  loading,
  books,
  handleClickOpen,
  updateBookLoading,
  deleteBookLoading,
  handleUpdateBook,
  handleDeleteBook,
}: BookCardListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={1}
      p={2}
      overflow="auto"
    >
      {loading
        ? [...Array(6)].map((_, index) => <BookCardSkeleton key={index} />)
        : books.map((book: Book) => (
            <BookCard
              key={book.id}
              book={book}
              handleClickOpen={handleClickOpen}
              updateBookLoading={updateBookLoading}
              deleteBookLoading={deleteBookLoading}
              handleUpdateBook={handleUpdateBook}
              handleDeleteBook={handleDeleteBook}
            />
          ))}
    </Stack>
  );
};

export default BookCardList;