import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
export default class News extends Component {
  
    static defaultProps = {
      country :'in',
      pageSize:8,
      category:'sports'

    }
    static propTypes = {
      country :PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string

    }


  constructor(){
    super();
    console.log("This is a constructor");
      this.state= {
        articles: [],
        loading: false,
        page:1
      }
    }
    
    async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=936891f6b67648b8bc3c7d9caf6f2d50&page=1&pagesize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parseData= await data.json()
      console.log(parseData);
      this.setState({articles:parseData.articles, totalResults: parseData.totalResults, loading:false})
    }

    handlePrevClick = async ()=>{
      let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=936891f6b67648b8bc3c7d9caf6f2d50&page=${this.state.page -1}&pagesize=${this.props.pageSize}`;
     this.setState({loading:true})
      let data = await fetch(url);
      let parseData= await data.json()
      console.log(parseData);

      this.setState({
        page: this.state.page -1,
        articles:parseData.articles,
        loading: false
      })
    }
    handleNextClick = async ()=>{
      console.log("next")

      if(!this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
      let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=936891f6b67648b8bc3c7d9caf6f2d50&page=${this.state.page +1 }&pagesize=${this.props.pageSize}`;
      
      this.setState({loading:true}) 
      let data = await fetch(url);
      let parseData= await data.json()
      console.log(parseData);

      this.setState({
        page: this.state.page + 1,
        articles:parseData.articles,
        loading: false
      })
    }
    }
    
  render() {
    
    return (
      <div className="container my-3 "  >
        <h1>Valorant- Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col md-4" key={element.url}>
            <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url}
            author = {element.author} date={element.publishedAt} source = {element.source.name}/>
           </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark "onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

      </div>
    );
  }
}
