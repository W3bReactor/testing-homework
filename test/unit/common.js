export const initialState = {
    products: [
        {"id": 0, "name": "Ergonomic Table", "price": 761},
        {"id": 1, "name": "Refined Mouse", "price": 120},
        {"id": 2, "name": "Practical Gloves", "price": 622}
    ],
    details: {
        0: {
            "color": "red",
            "material": "design",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem blanditiis corporis, deserunt dolor ea et incidunt inventore iste libero magni natus obcaecati optio quaerat qui, tenetur ullam, velit voluptas."
        },
        1: {
            "color": "green",
            "material": "ui",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem blanditiis corporis, deserunt dolor ea et incidunt inventore iste libero magni natus obcaecati optio quaerat qui, tenetur ullam, velit voluptas."
        },
        2: {
            "color": "blue",
            "material": "opacity",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem blanditiis corporis, deserunt dolor ea et incidunt inventore iste libero magni natus obcaecati optio quaerat qui, tenetur ullam, velit voluptas."
        },
    },
    cart: {}
}