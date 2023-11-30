import {
  styled,
  Card,
  CardContent as Content,
  CardActions as Actions,
} from "@mui/material";
import { CardMedia } from "@mui/material";
import { Book } from "../api/graphql/generated";

export const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 200,
  maxWidth: 300,
  borderRadius: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

export const CardContent = styled(Content)(() => ({
  height: "100%",
}));

export const CardActions = styled(Actions)(() => ({
  justifyContent: "space-between",
}));

interface BookCardProps {
  book: Book;
  imgHeight?: number;
  cardContent: React.ReactNode;
  cardActions: React.ReactNode;
}

const BookCard = ({
  book,
  imgHeight,
  cardContent,
  cardActions,
}: BookCardProps) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height={imgHeight || 200}
        image={
          book.imageLinks?.smallThumbnail ||
          book.imageLinks?.thumbnail ||
          "no-book-img.png"
        }
        alt={book.title}
        sx={{
          pt: 2,
          objectFit: "contain",
        }}
      />
      <CardContent>{cardContent}</CardContent>
      <CardActions disableSpacing>{cardActions}</CardActions>
    </StyledCard>
  );
};

export default BookCard