const url = `http://localhost:4000/api/v1`;

class ColorModel {
    static getColor = (colorId) => {
        return fetch(`${url}/color/${ colorId }`)
            .then(res => res.json())
    }
}

export default ColorModel;