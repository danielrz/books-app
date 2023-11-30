import { useMemo, useState } from "react";
import {
  GoogleBook,
  useSearchGoogleBooksQuery,
} from "../../api/graphql/generated";
import PageTitle from "../../components/PageTitle";
import { Box, Divider, OutlinedInput, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDebounce } from "use-debounce";
import { GoogleBookCard } from "../../components/GoogleBookCard";
import GoogleBookListSkeleton from "../../components/GoogleBookListSkeleton";
import { LoadingButton } from "@mui/lab";

const SearchBarStyle = styled(OutlinedInput)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1.5),
  padding: "0 10px",
}));

function Search() {
  const [searchTerm, setSearchTerm] = useState("javascript");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [fetchingMore, setFetchingMore] = useState(false);

  const { data, loading, fetchMore } = useSearchGoogleBooksQuery({
    variables: {
      query: debouncedSearchTerm,
      apiKey: process.env.GOOGLE_BOOK_APP_API_KEY || "",
      startIndex: 0,
    },
  });

  const books = useMemo(() => {
    return (data?.searchGoogleBooks?.items as GoogleBook[]) || [];
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFetchMore = async () => {
    setFetchingMore(true);
    await fetchMore({
      variables: {
        query: debouncedSearchTerm,
        apiKey: process.env.GOOGLE_BOOK_APP_API_KEY || "",
        startIndex: books.length,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (!fetchMoreResult) {
          setFetchingMore(false);
          return previousResult;
        }

        const previousBooks = previousResult?.searchGoogleBooks?.items || [];
        const moreBooks = fetchMoreResult?.searchGoogleBooks?.items || [];

        if (fetchMoreResult.searchGoogleBooks) {
          fetchMoreResult.searchGoogleBooks.items = [
            ...previousBooks,
            ...moreBooks,
          ];
        }

        setFetchingMore(false);
        return { ...fetchMoreResult };
      },
    });
  };

  return (
    <>
      <PageTitle title="Search Books" />
      <SearchBarStyle
        id="search-bar"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        startAdornment={<SearchIcon sx={{ mr: 1 }} />}
        fullWidth
      />
      <Divider sx={{ my: 2 }} />
      {loading ? (
        <GoogleBookListSkeleton />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={2}
        >
          {books.map((book: GoogleBook) => (
            <GoogleBookCard googleBook={book} key={book.id} />
          ))}
        </Box>
      )}
      <Box p={3} display="flex" justifyContent="center">
        <LoadingButton
          variant="contained"
          color="primary"
          loading={fetchingMore}
          loadingIndicator="loading..."
          disabled={books.length === data?.searchGoogleBooks?.totalItems}
          onClick={handleFetchMore}
        >
          Load more books
        </LoadingButton>
      </Box>
    </>
  );
}

export default Search;
