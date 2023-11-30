import { Link } from "react-router-dom";
import { useCreateBookMutation, useListBooksQuery } from "../api/graphql/generated";
import useUserDetails from "../hooks/useUserDetails";
import { Box, Button } from "@mui/material";

function Home() {

  const { userDetails, signOut } = useUserDetails();
  const { data, loading, error, refetch } = useListBooksQuery();
  const [
    createBook,
    { data: createBookData, loading: createBookLoading, error: createBookError }
  ] = useCreateBookMutation();
  const handleCreateBook = async () => {
    await createBook({
      variables: {
        input: {
          title: 'My Book',
          publishedDate: '2021-10-10',
          authors: ['Author 1', 'Author 2'],
          description: 'My Book Description',
          publisher: 'My Publisher',
        }
      }
    })
    refetch();
  }

  return (
    <>
      <h4>My Books collection</h4>
      <Box sx={{ display: 'flex', gap:2 }}>
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
      {(loading || createBookLoading) && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {createBookError && <div>Error: {createBookError.message}</div>}
      <div><Button variant="contained" onClick={handleCreateBook}>Create</Button></div>
      {data?.listBooks?.map((book) => (
        <div key={book?.id}>
          <div>{book?.title}</div>
          <div>{book?.publishedDate}</div>
          <div>{book?.authors}</div>
          <div>{book?.description}</div>
          <div>{book?.publisher}</div>
        </div>
      ))}
    </>
  )
}

export default Home