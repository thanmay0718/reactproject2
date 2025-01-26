import {Query} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('htps://cloud.appwrite/io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);


export const updateSearchCount = async (searchTerm, movie) => {
//1.Use appwrite 1st SDK to check if the search term exists in the database
    //2. If it does, update the count
        //3. If it doesn't, create a new document wit the search term and count as 1

try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', searchTerm),
    ])

    if(result.documents.length > 0){
        const doc = result.documents[0];
        await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
            count: doc.count + 1,
        })
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID,ID.unique(), {
            searchTerm,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })
    }

} catch (error) {
    console.log(error);
}

}
