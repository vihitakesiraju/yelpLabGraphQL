import { gql } from 'apollo-boost';



getCustomerQuery = gql`
query getCustomer($customer_email: String!){
    getcustomer(customer_email: $customer_email) {
        customer_name
        birthday
        contact_number
        blog_ref
        things_loved
        find_me
        about
        yelping_since
    }
}
`;

getRestaurantsQuery = gql`
query getRestaurants($search_string: String!){
    getrestaurants(search_string: $search_string) {
        restaurant_name
        restaurant_description
        review_count
        email
        address_city
        restaurant_address
    }
}
`;




getRestaurantOrdersQuery = gql`
query getRestaurantOrders($restaurant_id: String!){
    getrestaurantorders(restaurant_id: $restaurant_id) {
        delivery_address
        address_city
        address_postal_code
        address_latitude
        address_longitude
        primary_phone
        payment_card_digits
        cart_items
        customer_id
        restaurant_id
        order_type
        order_status
        order_total_price
    }
}
`;




export { getCustomerQuery, getRestaurantsQuery,getRestaurantOrdersQuery };