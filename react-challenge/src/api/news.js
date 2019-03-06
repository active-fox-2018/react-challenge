async function getNews(category, search) {
    category = category || ''
    search = search || ''
    
    let url = ''
    if (search !== '') {
        url = `https://newsapi.org/v2/everything?q=${search}&language=en`
    } else {
        url = `https://newsapi.org/v2/top-headlines?q=&category=${category}&country=us`
    }
    let newsData = await window.axios({
        url,
        headers: {
            'Authorization': 'Bearer 2ee86e45c1cb43b5b559d8042d629fca'
        }
    })
    return newsData.data
}

export { getNews }
