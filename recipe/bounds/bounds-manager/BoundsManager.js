class BoundsManager{

    isOnSlope(bounds1, bounds2) {
        return (
            marginError(getSlope(bounds1[0]['x'], bounds1[0]['y'], bounds2[0]['x'], bounds2[0]['y']),getSlope(bounds1[1]['x'], bounds1[1]['y'], bounds2[1]['x'], bounds2[1]['y'])) < 0.5
        );
    }
    getSlope(x1, y1, x2, y2){
        return ((y2-y1)/(x2-x1));
    }
    marginError(s1, s2){
        return Math.abs((s1-s2)/Math.max(s1,s2));
    }

}


module.exports = BoundsManager;
