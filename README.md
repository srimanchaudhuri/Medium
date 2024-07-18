# Medium Clone

A clone of the Medium blogging platform built with modern web technologies.

## Features

- User authentication and authorization
- Creating, editing, and deleting blog posts
- Viewing blog posts by various authors
- Liking and commenting on blog posts

## Technologies Used

- React
- Node.js
- Express
- PostgreSQL
- Vercel (for deployment)

## Demo

Check out the live demo: [Medium Clone](https://medium-one-omega.vercel.app/signup)

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/medium-clone.git
    cd medium-clone
    ```

2. Install dependencies for the server and client
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. Create a `.env` file in the `server` directory and add your environment variables
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. Run the development server
    ```bash
    # Run server
    cd server
    npm run dev

    # Run client
    cd ../client
    npm start
    ```

## Usage

1. Sign up for a new account on the [sign up page](https://medium-one-omega.vercel.app/signup).
2. Create and publish your own blog posts.
3. View, like, and comment on other users' posts.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

Sriman Chaudhuri - srimanchaudhuri@gmail.com

Project Link: [https://github.com/srimanchaudhuri/medium-clone](https://github.com/srimanchaudhuri/Medium)
