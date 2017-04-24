import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView,
	Dimensions,
	RefreshControl
} from "react-native";
import BookItem1 from "./BookItem1";
import HttpUtils from "../../HttpUtils"

const URL = "https://mie-mie.tech/books/show_books"


export default class BookList extends Component {
	constructor(props) {
		super(props);
		
		let data = this.props.books_data?this.props.books_data:[]
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged:(r1,r2)=>r1!==r2
			}),
			isLoading:false,
			page:1
		}
		// alert(this.props.data)
		this.onLoad();
	}
	onLoad() {
		HttpUtils.post(URL,{
			uid:this.props.user.uid,
			token:this.props.user.token,
			timestamp: new Date().getTime(),
			page:1
		}).then((result)=>{
			// alert(JSON.stringify(result));
			this.setState({dataSource:this.state.dataSource.cloneWithRows(result.data)});
		});
	}
		// this.setState({page:this.state.page+1});
	renderRow(data) {
		return <BookItem1 navigator={this.props.navigator} data={data}/>;
	}
	render() {
		return <View style={[styles.booklist,this.props.style]}>
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(data)=>this.renderRow(data)}
				refreshControl = {
					<RefreshControl 
						refreshing={this.state.isLoading}
						onRefresh={()=>{
							this.onLoad();
						}}/>
				}
			/>
		</View>
	}
}

const styles = StyleSheet.create({
	booklist: {
		marginTop:10,
		width:Dimensions.get("window")-16
	},
});