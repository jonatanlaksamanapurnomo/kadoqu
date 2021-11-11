import gql from "graphql-tag";

const QUERY_GET_TESTIMONIES = gql`
  query getTestimonies($limit: Int, $offset: Int, $category: String) {
    getTestimonies(limit: $limit, offset: $offset, category: $category) {
      name
      shortDescription
      budget
      testimony
      image
      category
    }
    getTestimoniesLength(category: $category)
  }
`;

const QUERY_GET_TESTIMONY_CATEGORIES = gql`
  query getTestimonyCategories {
    getTestimonyCategories
  }
`;

export { QUERY_GET_TESTIMONIES, QUERY_GET_TESTIMONY_CATEGORIES };
