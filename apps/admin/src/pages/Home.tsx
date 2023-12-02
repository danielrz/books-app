import { Stack } from "@mui/material";
import PageTitle from "../components/PageTitle";
import { useBooks } from "../hooks/useBooks";
import { BookTabs } from "../components/BookTabs";
import { Book } from "../api/graphql/generated";
import { useState } from "react";
import BookDetailsDialog from "../components/BookDetailsDialog";
import BookCardList from "../components/BookCardList";
// import { LoadingButton } from "@mui/lab";

import { Link } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
import { Box, Button } from "@mui/material";

function Home() {
  const [open, setOpen] = useState(false);
  const [detailsBook, setDetailsBook] = useState<Book | undefined>(undefined);
  const { userDetails, signOut } = useUserDetails();

  const {
    books,
    loading,
    updateBookLoading,
    deleteBookLoading,
    handleUpdateBook,
    handleDeleteBook,
    // fetchMoreBooks,
    // fetchingMore,
    // canFetchMoreBooks,
  } = useBooks();

  const handleClickOpen = (book: Book) => {
    setDetailsBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && detailsBook && (
        <BookDetailsDialog handleClose={handleClose} book={detailsBook} />
      )}
      <PageTitle title="My books collection" />
      <Box sx={{ display: "flex", gap: 2 }}>
        <div>Welcome</div>
        <div>{userDetails?.email}</div>
        <div>{userDetails?.firstName}</div>
        <div>{userDetails?.lastName}</div>
        <div>
          <Button variant="contained" color="primary" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </Box>
      <div>
        <Link to="/search">Search for additional books</Link>
      </div>
      {/* <LoadingButton
        variant="contained"
        size="small"
        color="primary"
        disabled={!canFetchMoreBooks}
        loading={fetchingMore}
        sx={{ my: 1 }}
        onClick={fetchMoreBooks}
      >
        Load more
      </LoadingButton> */}
      <Stack spacing={1}>
        <BookTabs
          booksCount={[books?.reading?.length]}
          tabs={{
            Reading: (
              <BookCardList
                books={books.reading}
                loading={loading}
                handleClickOpen={handleClickOpen}
                updateBookLoading={updateBookLoading}
                deleteBookLoading={deleteBookLoading}
                handleUpdateBook={handleUpdateBook}
                handleDeleteBook={handleDeleteBook}
              />
            ),
          }}
        />
        <BookTabs
          booksCount={[books?.unread?.length, books?.read?.length]}
          tabs={{
            "To Read": (
              <BookCardList
                books={books.unread}
                loading={loading}
                handleClickOpen={handleClickOpen}
                updateBookLoading={updateBookLoading}
                deleteBookLoading={deleteBookLoading}
                handleUpdateBook={handleUpdateBook}
                handleDeleteBook={handleDeleteBook}
              />
            ),
            Finished: (
              <BookCardList
                books={books.read}
                loading={loading}
                handleClickOpen={handleClickOpen}
                updateBookLoading={updateBookLoading}
                deleteBookLoading={deleteBookLoading}
                handleUpdateBook={handleUpdateBook}
                handleDeleteBook={handleDeleteBook}
              />
            ),
          }}
        />
        </Stack>
    </>
  );
}

export default Home;
