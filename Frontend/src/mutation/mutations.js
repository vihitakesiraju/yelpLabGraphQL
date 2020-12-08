import { gql } from 'apollo-boost';

postLoginQuery = gql`
mutation userLogin($username: String!,$user_password:String!){
    userlogin(username: $username,user_password:$password) {
        user_type
        user_id
        email_id
        user_password
        _id
    }
}
`;



createDishQuery = gql`
mutations createDish($description: String!, $dish_name:String!, $image_url: String!, $ingredients: String!, 
    $price: String!, $category_id: String!, $restaurant_id: String!  ){
    createdish(description: $description, dish_name: $dish_name, image_url: $image_url, ingredients: $ingredients, 
        price: $price, category_id: $category_id, restaurant_id: $restaurant_id  ) {
            description
            dish_name
            image_url
            ingredients
            price
            category_id
            restaurant_id
}
`;



postCustomerQuery = gql`
mutations postCustomer($customer_id: Int!, $customer_name:String!, $birthday: String!, $contact_number: String!, 
    $blog_ref: String!, $things_loved: String!, $find_me: String!  ){
        postcustomer(customer_id: $customer_id, customer_name: $customer_name, birthday: $birthday, contact_number: $contact_number, 
            blog_ref: $blog_ref, things_loved: $things_loved, find_me: $find_me  ) {
                customer_id
                customer_name
                birthday
                contact_number
                blog_ref
                find_me
                about
                yelping_since
}
`;

postOrderQuery = gql`
mutations postOrder($cart_items: [String]!, $order_type:String!, $order_total_price: String!, $customer_id: String!, 
    $restaurant_id: String!, $payment_card: Int!, $delivery_address: String!, $address_city: String, 
    $address_postal_code: Int, $address_latitude: Int, $address_longitude: Int, $primary_phone: Int! ){
        postorder(cart_items: $cart_items, order_type: $order_type, order_total_price: $order_total_price, customer_id: $customer_id, 
            restaurant_id: $restaurant_id, payment_card: $payment_card, delivery_address: $delivery_address , 
            address_city:$address_city, address_postal_code: $address_postal_code, address_latitude: $address_latitude,
            address_longitude: $address_longitude, primary_phone: $primary_phone  ) {
                customer_id
                customer_name
                birthday
                contact_number
                blog_ref
                find_me
                about
                yelping_since
}
`;



updateDeliveryQuery = gql`
mutations updateDelivery($order_id: String!, $order_status: String! ){
        updateDelivery(order_id: $order_id, order_status: $order_status ) {
            order_status
            order_id
}
`;


export {postLoginQuery, createDishQuery, postCustomerQuery, postOrderQuery, updateDeliveryQuery };