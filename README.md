# Readme

This is a React App to submit Reliant test. This application is the frontend part of the [Rails API](https://github.com/nettocavalcanti/reliant-forms-api) developed for the same purpose. Here I made a paginated `DataTable` for each `Resource` available, a HTML Form to create `Resources` and a preview mode which show the `YAML` formatted spec for the HTML Form.

This application was built using these frameworks and versions:
* Node 14.17.3
* Yarn 1.22.10
* React 17.0.2
* Material UI 4.x
* Axios 0.24.0
* React Toasts 3.0.6
* React Ace 9.5.0

## Available Scripts

In the project directory, you can run:

### 1 - `yarn`
To install all dependencies and prepare the application to run.

### 2 - `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

* **NOTE: This app talks to an API located in http://localhost:3001**



# Custom `JSON` and `YAML` inputs

The forms used to fill the `FormSpec` uses the `React Ace` framework wich can be customized to parse some code languages instead using the default `textarea`.

Example of `YAML` text formatted using `Reat Ace` (read only):

![image](https://user-images.githubusercontent.com/10437444/142947596-06d1ffe5-ed54-419a-89a0-544005122814.png)

Example of `JSON` text for input `FormSpecs`:

![image](https://user-images.githubusercontent.com/10437444/142947700-028e7137-f8cc-4b5b-9eb5-2011b84b5b7b.png)

![image](https://user-images.githubusercontent.com/10437444/142947762-3af5e6bc-e946-4c57-ad85-151a7df4eb58.png)

* **NOTE: For the `YAML` template, the parser validation is not working.**



# API Response messages

Sending data by Forms can result in `Bad Request` response among other statuses. Those forms can show what happened using the Material UI `Alert` component:

![image](https://user-images.githubusercontent.com/10437444/142948123-0af10210-acb4-43e1-a0e0-a87ae706311a.png)



# DataTables

Using a `TableContainer` component from Material UI, I customized and standardized a component that uses an URI to show paged list results and navigate through the pages sending new requests for the API. This component also can handle different `Rows Per Page` and can customize the columns through a `header` content. In some cases, the columns can even add another components with customized actions like the image bellow:

![image](https://user-images.githubusercontent.com/10437444/142948743-2335d75d-52f6-47c8-b811-a2940228c441.png)

Additionally, the rows click can lead to another route, facilitating navigation between tables and record details.



# Loading Component

The `Loading` component was built with `CircularProgress` component from Material UI library. It is useful to ensures end users know when the application is waiting for the API responses.

![image](https://user-images.githubusercontent.com/10437444/142949123-8727b155-335c-45c7-b428-d3e23b83e636.png)



# Toast Messages

When the API respondes with errors like communication failure, the `ToastMessage` components shows that information to the user. This component was built using `ToastStore` component from the `react-toasts` library.

![image](https://user-images.githubusercontent.com/10437444/142949431-b6d4eab9-7922-4f62-9ccd-433f86dcb43a.png)




# Themes

Built to work with custom colors, I developed some basic themes that can be changed in the `src/components/themes/theme.js` where you can choose one between the bellow:

* Black And Orange
* Blue Gray
* Brown Sugar
* Eletric Blue
* Royal Purple
* Sailor Blue
* Sky Blue
* Space Cherry

It becomes easy to build your own theme, you just need to find colors and fill the following specification:

```typescript
const colors = {
    primary: '#101820FF',
    primaryLight: '#2D465EFF',
    primaryDark: '#000000FF',
    secondary: '#F2AA4CFF',
    secondaryLight: '#f7d09cFF',
    secondaryDark: '#a37436FF',
    inherit: '#9ea7b0FF',
    default: '#D3D0CBFF'
}

export default colors;
```

To use a theme just change the line number 2 of the `src/components/themes/theme.js` pointing to your desired theme:
```typescript
import colors from './spaceCherry';
```

Example of some themes:

* Space Cherry

![image](https://user-images.githubusercontent.com/10437444/142946285-6b812a07-d5ed-4be5-b077-42e734c87f9e.png)

![image](https://user-images.githubusercontent.com/10437444/142946406-e2167752-bfa4-4e52-b33a-39bb189b1c49.png)

![image](https://user-images.githubusercontent.com/10437444/142946467-8e653248-0622-4c6e-9858-a32dd7305fa3.png)

* Brown Sugar

![image](https://user-images.githubusercontent.com/10437444/142946537-911b128c-80ec-4c94-8d8b-a3a438f8cfca.png)

![image](https://user-images.githubusercontent.com/10437444/142946598-456b0661-d255-45d0-9db5-85363a253ba4.png)

![image](https://user-images.githubusercontent.com/10437444/142946732-fac1f5ea-bdd9-4452-97f4-e3cb91379393.png)

* Sky Blue

![image](https://user-images.githubusercontent.com/10437444/142946784-35b398f4-a898-4a49-84c2-581d06cda40f.png)

![image](https://user-images.githubusercontent.com/10437444/142946801-bdeba7dc-13ed-4556-99a6-74aef6bc3cb7.png)

![image](https://user-images.githubusercontent.com/10437444/142946882-c81d045b-8764-4674-81b9-1e1d3882c550.png)

* Royal Purple

![image](https://user-images.githubusercontent.com/10437444/142947051-fdf1d712-1fcc-493c-a1b9-677e8eba2d3c.png)

![image](https://user-images.githubusercontent.com/10437444/142947081-2018c26f-e87d-485e-8ce1-ce4315f88e6a.png)

![image](https://user-images.githubusercontent.com/10437444/142947125-37a82819-b85f-4f2a-a376-c72aa91d6190.png)



# What is missing

* Improve UI Design
* Make the `YAML` parser works to show formatting errors
* Create a customized and generalized Form to reuse on all of the forms (passing only the content need to catch after fill the form)
* Improve codes for the "fulfill form" and "preview `yml` context"
* Centralize some common styles used in all application
* Create a Footer component
* Implement tests
* Improve responsiveness
