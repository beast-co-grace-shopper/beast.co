/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'

export {default as AllAnimals} from './Animal/AllAnimals'
export {default as SingleAnimal} from './Animal/SingleAnimal'
export {default as Cart} from './Cart/Cart'
export {default as AddressForm} from './Cart/AddressForm'
export {default as AddressCard} from './Cart/AddressCard'
export {default as AnimalCartCard} from './Animal/AnimalCartCard'
export {default as AnimalReview} from './Animal/AnimalReview'
export {default as Confirmation} from './Cart/Confirmation'
export {default as AllOrders} from './Order/AllOrders'
export {default as Admin} from './Admin/admin'
export {default as Orders} from './Admin/Orders'
export {default as Products} from './Admin/Products'
export {default as Users} from './Admin/Users'
