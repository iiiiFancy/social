import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { AroundMarker } from './AroundMarker';
import { POS_KEY } from '../constants';

class AroundMap extends React.Component {
    reloadMarkers = () => {
        const center = this.map.getCenter(); // 获取当前地图类instance的中心点,this.map是全局变量
        const location = { lat: center.lat(), lon: center.lng() };
        const range = this.getRange(); // 随着地图尺寸改变range也会随之改变
        this.props.loadNearbyPosts(location, range);
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast(); // 右上角坐标
            const right = new google.maps.LatLng(center.lat(), ne.lng()); // LatLng:地图上的点
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right); // 计算两点间球面面积
        }
    }


    getMapRef = (map) => { // 输入参数是当前类的reference
        this.map = map;
        window.map = map;
    }
    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY)); // 本机坐标存在localStorage里
        return (
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.reloadMarkers} // 拖动地图时
                onZoomChanged={this.reloadMarkers} // 放大缩小地图时
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon }}
                defaultOptions={{ scaleControl: true }}
            >
                {this.props.posts.map((post) => <AroundMarker key={post.url} post={post}/> )}
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));