import gql from "graphql-tag";

const addGidaFeedback = gql`
    mutation addGidaFeedback($rating:Int,$kecepatan_cs:Boolean , $service:Boolean,$kualitas_product:Boolean,$kualitas_wrapping:Boolean,$keamanan_packing:Boolean  ,$description:String){
        addGidaFeedback( rating:$rating ,kecepatan_cs:$kecepatan_cs,service:$service,kualitas_product:$kualitas_product,kualitas_wrapping:$kualitas_wrapping,keamanan_packing:$keamanan_packing ,description:$description)

    }
`;

export  {addGidaFeedback};