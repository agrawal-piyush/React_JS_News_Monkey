import React, { Component } from 'react'
import Newsitem from './Newsitem'
export class News extends Component {
  constructor(){
    
    super()
    this.state={
      articles:[],  
      loading: false,
      page:1,
      nxt:false
    }
  }
  
  
  async componentDidMount(){
    let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=6ed7e1877c8d42a89b18825fcdbc68e1&page=1&pagesize=20"
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData)
    this.setState({articles:parseData.articles, totalResults: parseData.totalResults})
  }
  
  PREV= async ()=>{
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=6ed7e1877c8d42a89b18825fcdbc68e1&page=${this.state.page-1}&pagesize=20`
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData)
    
    this.setState({
      page: this.state.page-1,
      articles:parseData.articles
    })}
  
  NEXT= async ()=>{
    if (this.state.page + 1>Math.ceil(this.state.totalResults/20))
    {

    }
    else{
      let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=6ed7e1877c8d42a89b18825fcdbc68e1&page=${this.state.page+1}&pagesize=20`
      let data = await fetch(url)
      let parseData = await data.json()
      console.log(parseData)
      
      this.setState({
        page: this.state.page+1,
        articles:parseData.articles
       
         })}
  }
  
  render() {
    return (
      <div className='container my-3'>
       
        <h2>Top HeadLines</h2>
       <div className="row">
        
       {this.state.articles.map((element)=>{
         return <div className="col-md-4" key ={element.url}>
        <Newsitem   title={element.title?element.title.slice(0,45):"News"} description={element.description?element.description.slice(0,88):"click below to know more"} imageUrl ={element.urlToImage?element.urlToImage:"https://static.toiimg.com/thumb/imgsize-37494,msid-96724015,width-400,resizemode-4/96724015.jpg"} newsUrl={element.url}/>
        </div>

    
       }
       )}
       <div className="contianer d-flex justify-content-between">
        <button type='button' disabled = {this.state.page<=1} className='btn btn-dark'onClick={this.PREV}> &larr; Previous </button>
        <button type='button'disabled={this.state.page + 1>Math.ceil(this.state.totalResults/20)} className='btn btn-dark' onClick={this.NEXT}> Next &rarr; </button>
       

       </div>
       
        </div> 
    
       </div>
    
    )
  }
}

export default News
