const url = `http://localhost:4000/api/v1`;

class ColorModel {
    static all = () => {
        return fetch(`${url}/color/`)
            .then(res => res.json());
    };

    static getColor = (colorId) => {
        return fetch(`${url}/color/${ colorId }`)
            .then(res => res.json())
    }
}

export default ColorModel;