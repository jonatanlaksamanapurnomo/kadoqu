import gql from "graphql-tag";

const QUERY_PDF = gql`
  query createPdf($pdf: Pdf) {
    createPdf(pdf: $pdf)
  }
`;

export { QUERY_PDF };
