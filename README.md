
## UI
![CCnews](![image](https://github.com/Quanq050823/admin_newsreader/assets/115741397/b829ddc8-5b94-4a2d-aaf5-22cb3bc88f90))
)

## Quick Start

- Clone the repo: `git clone https://github.com/Quanq050823/admin_newsreader.git`

### Installation

``` bash
$ npm install
```

## Using Firestore Realtime Database
- JSON for tesing:
```
{
  "NewsSource": {
    "0": {
      "ActiveStatus": true,
      "DateCreated": "2023-05-10",
      "Description": "A leading news network",
      "Name": "CNN",
      "URL": "https://www.cnn.com"
    },
    "1": {
      "ActiveStatus": true,
      "DateCreated": "2022-09-01",
      "Description": "British Broadcasting Corporation",
      "Name": "BBC",
      "URL": "https://www.bbc.com"
    },
    "2": {
      "ActiveStatus": true,
      "DateCreated": "2021-12-15",
      "Description": "American newspaper",
      "Name": "The New York Times",
      "URL": "https://www.nytimes.com"
    },
    "-Nx9C9lwLUo6dgbhpM8B": {
      "ActiveStatus": "2",
      "DateCreated": "06/05/2024",
      "Description": "Tran Duc Quang deeptrai",
      "Name": "TDQ",
      "URL": "ducquangdeptrylail.com"
    },
    "-Nx9CFur4bFI_nF8Z5P9": {
      "ActiveStatus": "1",
      "DateCreated": "06/05/2024",
      "Description": "Tran Duc Quang deeptrai hon",
      "Name": "HieuThu2",
      "URL": "ducquangdeptrylail.com"
    }
  },
  "NewsTopic": [
    {
      "DateCreated": "2023-06-05",
      "Description": "News related to politics and government",
      "Name": "Politics"
    },
    {
      "DateCreated": "2022-11-20",
      "Description": "News related to technology and innovation",
      "Name": "Technology"
    },
    {
      "DateCreated": "2024-01-10",
      "Description": "News related to sports and athletics",
      "Name": "Sports"
    },
    {
      "DateCreated": "2023-09-15",
      "Description": "News related to business and finance",
      "Name": "Business"
    }
  ],
  "User": [
    {
      "DateCreated": "2024-04-01",
      "Email": "johndoe@example.com",
      "LastActive": "12:30:00",
      "Name": "John Doe",
      "Password": "password123",
      "Status": "Active",
      "Type": "Regular"
    },
    {
      "DateCreated": "2024-03-15",
      "Email": "janesmith@example.com",
      "LastActive": "09:45:00",
      "Name": "Jane Smith",
      "Password": "secret456",
      "Status": "Inactive",
      "Type": "Admin"
    },
    {
      "DateCreated": "2024-04-20",
      "Email": "markjohnson@example.com",
      "LastActive": "18:15:00",
      "Name": "Mark Johnson",
      "Password": "qwerty789",
      "Status": "Active",
      "Type": "Regular"
    }
  ]
}

```
