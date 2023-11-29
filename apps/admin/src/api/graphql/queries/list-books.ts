import { gql } from "@apollo/client";
import { BOOK_FRAGMENT } from "../fragments/book";

export const LIST_BOOKS_QUERY = gql`
  query ListBooks {
    listBooks {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`;