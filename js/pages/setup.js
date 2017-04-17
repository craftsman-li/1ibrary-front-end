import React, {Component} from "React";
import {
	View,
	StyleSheet,
	Text,
	Navigator
} from "react-native";
import HomePage from "./HomePage"
import BookCollectListPage from "./BookCollectListPage"

function setup() {
	// 进行一些初始化配置
	class Root extends Component {
		renderScene(route, navigator) {
			let Component = route.component;
			return <Component {...route.params} navigator={navigator}/>;
		}
		render() {
			return <Navigator
			    initialRoute = {{component:HomePage}}
			    renderScene = {(route, navigator)=>{
						let Component = route.component
						return <Component navigator={navigator} {...route.params}/>
					}}
			    />
		}
	}
	
	return <Root/>
}

module.exports = setup;