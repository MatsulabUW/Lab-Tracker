# Lab-Tracker
A full-stack laboratory inventory app built with React.js frontend and Node.js backend.

This is a newer version of the previous 'Lab-checkout' project.
The major change is the use of React.js framework instead of Vanilla JS.

## Table of Contents

- [How to get this app](#how-to-get-this-app)
- [How to use this app](#how-to-use-the-app)
- [Design](#design)
  - [Front-end](#front-end)
  - [The API](#data-api)
- [For Developers](#for-developers)
- [Tech Stack](#tech-stack)
- [Roadmap](#roadmap)
- [Contributing](#how-to-contribute)
- [Contributors](#contributors)

## How to get this app

#### How to host your own instance

1. [Fork this repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
1. [Select a hosting service](https://duckduckgo.com/?q=list+of+web+hosting+services&t=lm&ia=web)
1. Follow their instructions to host from a GitHub repository
1. [Developers] To host this website on your localhost,
    go to '/frontend-react' and type `pnpm dev --host` on your command line to start the frontend,
    go to '/backend-node' and type `npm run dev` to start the backend.

#### How to use the app

1. Lab manager (exclusive functions)
  - Manage products by
    - supplies
      - add new
      - update general information
      - update stock information after ordering
      - delete
    - equipments
      - add new
      - update general information
      - update availability infromation
      - delete
2. Lab members (including manager)
  - Sign up / log in
  - Search products by
    - name
    - category
    - stock information (need to order)
    - reservation status (unavailable, available, reserved from/until)
  - Supplies
    - takeout / cancel
    - checkout
  - Equipments
    - fill out reservation info / cancel
    - checkout

## Design

### Front-end

- /index: search bar, search filters, list of products
  - For each products: open detailed information pop-up screen, takeout button
- /inventory: cart, checkout
- /labnote: past transactions (grouped by date and single transaction)
- /login
- /register
- /admin

### Data API (Back-end)

Create a Javascript Wrapper class to call several of the functions
we plan to implement for users:

- takeout supplies
- checkout information
- update product information
- this javascript wrapper class code will be hosted and called on by API requests

#### GolgiAparatus.incorporrated

**Request Informations with examples:**
- [GET] get information to load information on the website and apply search filters
    - [Parameters]
        - ?type (string) = [ equipments / supplies]
        - ?id = [id of the equipment / id of the supply]
        - ?action = [getCategory / getReservationList]
        - [Returns] JSON
- [POST] add / delete new tools, update status (availability, reservation, etc)
    - [Parameters]
      - ?type (string) = [equipments / supplies]
      - ?id = id of the equipment / supply
      - ?action = [addNew / delete / reserve (from / until) / update / takeOut]
      - [Returns] JSON

**Description:** handles Database calls to the microsoft azure server - creating a new supply / equipment - creating a new reservation - updating stock / availability information

**Example Response:**

```json
{
  [
    {
    item name: "Thermo Fischer beaker 500mL",
    item_descrip: "a very large beaker",
    last_updated: 5/12/2023,
    num_in_stock 10,
    unit_size: 500mL,
    item_location: Fridge drawer 201,
    location_descrip: On the lab bench on the right of the fridge,
    min_stock_replen: 3
    },
    {1},
    ....,
    {N}
  ]
}
```

**Error Handling:**

- Server side errors
  - If the item is out of stock or at low stock the program will throw an error
    preventing the user from checking out the supplies. Returns error message:
    {error: "No Supplies found"}
  - Same for if the equipment is not available for checkout.
- Client side errors
  - If the requst parameters are missing, client side error occurrs and returns
    error message: {error: "invalid request"}

### Database

Implement Several Databases using the following schema
using a Microsoft Azure Server:


### User Tables

#### User Information
```sql
CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100), -- user is going to log in through their Google account
  name VARCHAR(100), -- name that user is going to use in the website
  is_admin BOOLEAN
)
```

#### Cart ready to checkout
```sql
CREATE TABLE Cart(
  checkout_id INTEGER PRIMARY KEY,
  user_id INTEGER,
  e_id INTEGER,
  s_id INTEGER,
  checkout_duration INTEGER,
  -- Equipment
  checkout_amount INTEGER,
  -- Supply
  checkout_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (e_id) REFERENCES Equipment(catalog_num),
  FOREIGN KEY (s_id) REFERENCES Supplies(catalog_num)
)
```

### Equipment Tables

#### Equipment Catalog

Used by research users to log in/out equipment

```sql
CREATE TABLE Equipment (
  catalog_num varchar(100) PRIMARY KEY,
  gen_item_name varchar(100), -- maps to general name in spreadsheet
  specific_item_name varchar(150),
  item_descrip varchar(500),
  item_room varchar(50),
  item_location_descrip varchar(100),
  item_status INT FOREIGN KEY REFERENCES Checkout(item_status)  -- string determines if an item is checked out
                                                                -- 0: unavailable(because the equipment is broken),1: available, 2: reserved
);
```

#### Equipment Appointment table

Table in charge of actually handling scheduling equiquipment checkout duration

```sql
CREATE TABLE Checkout (
  catalog_num varchar(100) PRIMARY KEY,
  item_status INT PRIMARY KEY,    -- 0: unavailable(because the equipment is broken), 1: available, 2: reserved
  last_checkout_date DATETIME,
  checkout_duration INT,
  checkout_due_by DATETIME,
  checkout_by INT FOREIGN KEY REFERENCES User(user_id)
);
```

#### Equipment Financials

Only accessible to admin accounts(managers) to look at current inventory levels

```sql
CREATE TABLE Equipment_financials (
  catalog_num varchar(100) FOREIGN KEY REFERENCES Equipment(catalog_num),
  Vendor varchar(100),
  price float,
  funds_used varchar(100),
  Model_number varchar(100),
  Serial_number varchar(100),
  order_num varchar(100)
);
```

#### Supplies Table

Used so people can take out supplies from the shared inventory

```sql
CREATE TABLE Supplies (
  catalog_num varchar(100) PRIMARY KEY,
  item_name varchar(100),
  item_descrip varchar(150),
  last_updated DATE FOREIGN KEY REFERENCES Resupply(last_updated),
  num_in_stock INT FOREIGN KEY REFERENCES Resupply(num_in_stock),
  unit_size VARCHAR(25),
  item_location VARCHAR(100),
  location_descrip VARCHAR(50),
  min_stock_replen INT FOREIGN KEY REFERENCES Resupply(min_stock_replen)
);
```

#### Resupply Table

Keeps track of current inventory levels and other admin information

```sql
CREATE TABLE Resupply (
  item_name VARCHAR(100),
  num_in_stock INT PRIMARY KEY,
  min_stock_replen INT,
  price FLOAT,
  order_num VARCHAR(25),
  added_by VARCHAR(50),
  last_updated DATE PRIMARY KEY,
  Expiration_date DATETIME,
  Notes VARCHAR(250),
);
```

### Transaction Tables

#### Past Transactions
```sql
CREATE TABLE Transactions (
  transaction_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id FOREIGN KEY REFERENCES User(user_id),
  -- transaction information is saved: which product, checkout type, amount, etc)
)
```

## For Developers

Once forked and cloned, you will need to [install Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in the root of the project.

## Tech Stack

This project is built in HTML, CSS, and JavaScript. We selected vanilla JavaScript to reduce the chances of deprecated libraries or dependancies causing issues for deployments in the future.

## Roadmap

Planned Features: (in no particular order)

- [ ] Group-based "checkout"/listed-as-consumed of items, especially by experiment
- [ ] Google account OAuth login
- [ ] Export experimental protocol to `.txt` file.
- [ ] Scheduling equipment time
- [ ] Admin account that can add/remove users
- [ ] Send alert when item's inventory reaches 0 or preset amount, with button/reply functionality to list item as being on order
- [ ] Show if an item is on order, regardless of inventory amount
  - [ ] When item is on order it also shows a button to add the received items (once they've arrived). Once that button is pressed, a prompt to enter the number of items appears, with final 'add to inventory' button
- [ ] Ability to group items into experimental protocol "ingredient list"
- [ ] Ability to check out items / groups of items by experiment protocol

## How to contribute

Contributions are welcome! Please feel free to fork this repo, add any changes, and create a pull request against this repo's main branch. Please limit contributed code to HTML, CSS, and JavaScript. Please limit neaw features and/or fixed bugs to one feature/bug per branch. Please label your branches with `A-B`, where `A` is your name or GitHub username, and `B` is the feature, bug, or a description of the change, separated by a hyphen.

## Contributors

- [Semin Kim](https://github.com/minisemin)
- [RainyCityCoder](https://github.com/RainyCityCoder)
- Huge **Thank you** to [Matt Akamatsu](https://github.com/mattakamatsu) for hosting this repository
