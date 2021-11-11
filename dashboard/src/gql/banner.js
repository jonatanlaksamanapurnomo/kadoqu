import gql from "graphql-tag";

const QUERY_GET_BANNER = gql`
  query getBanner($location: String) {
    getBanner(location: $location) {
      id
      image
    }
  }
`;

const QUERY_GET_BANNERS = gql`
  query getBanners($location: String) {
    getBanners(location: $location) {
      id
      image
      rank
    }
  }
`;

const MUTATION_ADD_BANNER = gql`
  mutation addBanner($image: String, $rank: Int, $location: String) {
    addBanner(image: $image, rank: $rank, location: $location)
  }
`;

const MUTATION_UPDATE_BANNER_IMAGE = gql`
  mutation updateBannerImage($id: Int, $image: String) {
    updateBannerImage(id: $id, image: $image)
  }
`;

const MUTATION_UPDATE_BANNER_RANK = gql`
  mutation updateBannerRank($id: Int, $rank: Int) {
    updateBannerRank(id: $id, rank: $rank)
  }
`;

const MUTATION_DELETE_BANNER = gql`
  mutation deleteBanner($id: Int) {
    deleteBanner(id: $id)
  }
`;
const MUTATION_SET_REDIRECT_URL_BANNER = gql`
  mutation setUrlRedirectURL($id :Int , $url:String){
    setUrlRedirectURL(id:$id , url:$url)
  }
`;
export {
  QUERY_GET_BANNER,
  QUERY_GET_BANNERS,
  MUTATION_ADD_BANNER,
  MUTATION_UPDATE_BANNER_IMAGE,
  MUTATION_UPDATE_BANNER_RANK,
  MUTATION_DELETE_BANNER,
  MUTATION_SET_REDIRECT_URL_BANNER
};
