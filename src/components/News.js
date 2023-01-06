import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps ={
    country:'in',
    pagesize:8,
    category:'general'
  }  

  static propTypes={
    country:PropTypes.string,
    pagesize :PropTypes.number,
    category :PropTypes.string,
  }


  constructor(){
    
    super()
    this.state={
      articles:[],  
      loading:false,
      page:1,
    }
  }
  
  
  async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ed7e1877c8d42a89b18825fcdbc68e1&page=1&pagesize=${this.props.pagesize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData)
    this.setState({articles:parseData.articles, totalResults: parseData.totalResults,loading:false})
  }
  
  PREV= async ()=>{
    
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ed7e1877c8d42a89b18825fcdbc68e1&page=${this.state.page-1}&pagesize=${this.props.pagesize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parseData = await data.json()
    
    this.setState({
      page: this.state.page-1,
      articles:parseData.articles,
      loading:false
    })}
  
  NEXT= async ()=>{
    if (this.state.page + 1<Math.ceil(this.state.totalResults/this.props.pagesize))
    {

    
    
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ed7e1877c8d42a89b18825fcdbc68e1&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
      this.setState({loading:true})
      let data = await fetch(url)
      let parseData = await data.json()

      this.setState({
        page: this.state.page+1,
        articles:parseData.articles,
        loading:false
       
         })}
  }
  
  render() {
    return (
      <div className='container my-3'>
       <h1 className="text-center">Top HeadLines</h1>
       {this.state.loading && <Spinner/>}
               
       <div className="row">
        
       {!this.state.loading && this.state.articles.map((element)=>{
         return <div className="col-md-4" key ={element.url}>
        <Newsitem   title={element.title?element.title.slice(0,45):"News"} description={element.description?element.description.slice(0,88):"click below to know more"} imageUrl ={element.urlToImage?element.urlToImage:"https://static.toiimg.com/thumb/imgsize-37494,msid-96724015,width-400,resizemode-4/96724015.jpg"} newsUrl={element.url}/>
        </div>

    
       }
       )}
       <div className="contianer d-flex justify-content-between">
        <button type='button' disabled = {this.state.page<=1} className='btn btn-dark'onClick={this.PREV}> &larr; Previous </button>
        <button type='button'disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pagesize)} className='btn btn-dark' onClick={this.NEXT}> Next &rarr; </button>
       

       </div>
       
        </div> 
    
       </div>
    
    )
  }
}

export default News
