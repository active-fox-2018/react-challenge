export function fetchData (mangaData) {
    return {
        type: 'SET_DATA',
        data: mangaData
    }
}

export function deleteManga (id) {
    // const { mangaData } = this.state
    // const newMangaData = mangaData.filter(el => el.id !== id)    
    // this.setState({
    //   mangaData: newMangaData
    // })
}