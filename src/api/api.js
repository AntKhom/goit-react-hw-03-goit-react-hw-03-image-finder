const BASE_URL = "https://pixabay.com/api/";
const ITEM_PER_PAGE = 12;
const KEY = "39464156-6c3d114a5269f1cf634bfe107"

export function fetchPictures(query, page) {
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${ITEM_PER_PAGE}`
            console.log(url);
            return fetch(url
                //For Axios only
                //         // params : {
                //         //     key: "39464156-6c3d114a5269f1cf634bfe107",
                //         //     q: newQuery,
                //         //     safesearch: true,   
                //         //     per_page: ITEM_PER_PAGE,
                //         //     page,  
                //         //     image_type: "photo",
                //         //     orientation: "horizontal",
                //         // },
            )
                .then(res => res.json())
}