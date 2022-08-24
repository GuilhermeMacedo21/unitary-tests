# ACCT - Ratting Reviews - Guilherme Macedo

## About

Application created with the aim of allowing the user to add a review to a product

This app uses tachyons for CSS customization

## Configuration

1. In your manifest.json of Store Theme, add the app dependency

```
"dependencies": {
    "estagioacct.ratting-react": "0.x"
}
```

2. Declare the app composition in interfaces.json(If necessary)

```
{
    "ratting-review": {
        "component": "RattingReview"
    },
    "comments": {
        "component": "Comments"
    }
}
```

3. Declare the blocks in Store Theme Template in the place you want

<div align="center">![inside store](https://user-images.githubusercontent.com/83257240/183707852-1798bdd5-fe94-4bbf-8665-11e7925b07d7.png)
</div>

4. Link with vtex and see how the block is showing

<div align="center">![Link](https://user-images.githubusercontent.com/83257240/183708096-863c1fc9-2b8f-4bbb-9819-8dfcd067b3fb.png)</div>

5. Check the component in the store

<div align="center">![Gif](https://i.ibb.co/QfG89bv/gif.gif)</div>

<div align="center">![Comments](https://user-images.githubusercontent.com/83257240/183708251-e329b3a7-a124-41b5-be57-1a4cb0aee5c5.png)</div>