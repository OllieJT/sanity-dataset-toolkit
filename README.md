# The Sanity Dataset Toolkit

A toolkit for migrating data into Sanity. Uses Typescript and NodeJS. Provides utility functions for working with ndjson files, making it easier to move data into Sanity or edit data from sanity.

## Get started

```sh
npx degit github:OllieJT/sanity-dataset-toolkit YOUR_PROJECT_NAME
```

### Scripts

| Syntax   | Description                                      |
| -------- | ------------------------------------------------ |
| `dev`    | Runs `src/index.ts` every time there's a change. |
| `build`  | Runs `src/index.ts` once.                        |
| `ts`     | Check for typescript errors                      |
| `format` | Format files with prettier                       |

### Overview

#### Login to Sanity CLI

-   Make sure you have `@sanity/cli` installed. You can install it globally with `npm i -g @sanity/cli`
-   Run `sanity login` and complete authentication

---

#### Export your data from sanity (Optional)

-   Open the root of your Sanity project in the terminal
-   Run `sanity dataset export` and follow instructions to export your data
-   Locate your extracted data with the `.tar.gz` extension.
    -   You'll want to extract it, I recommend using [Keka](https://www.keka.io/) if you're on Mac.
    -   You can also google how to do this in the terminal.
-   Rename the decompressed directory to `dataset` and place it in the _root_ of this project alongside `/src` and `package.json`.

#### Using the toolkit

Tools are located in `src/lib/*`. You _shouldn't_ need to change anything here - however, given how much migration projects can vary I thought it best to keep everything accessible, rather than in a package.

**Dataset Tools**

| name               | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| clearNDJSON()      | Deletes all data from within a file                               |
| appendNDJSON()     | Adds one document to the end of a file                            |
| readNDJSON()       | Reads documents from a file                                       |
| addToDataset()     | Wraps around appendNDJSON() to save documents to the output file  |
| useSanityDataset() | Wraps around readNDJSON() to ingest documents from the input file |
| generateID()       | Generates Sanity document ID's with support for drafts.           |

**Helper Functions**

| name            | Description                                              |
| --------------- | -------------------------------------------------------- |
| capitalize()    | Capitalizes the first letter in a string                 |
| titleCase()     | Capitalizes the first letter of every word in a string   |
| slugify()       | Converts any string to a url-safe slug                   |
| useImportPath() | Conveniently provides paths to import file and directory |
| useExportPath() | Conveniently provides paths to export file and directory |

#### Import your data to sanity

Files generated from this toolkit are located in `/new-dataset/*`. Currently this only consists of one file to import documents. For now you can import this file directly with something like

```sh
sanity dataset import ../sanity-dataset-migration/new-dataset/data.ndjson
```

Some additional options

```sh
sanity dataset import <path-to-your-file>.ndjson

# Flags
	--missing # On duplicate document IDs, skip importing document in question
	--replace # On duplicate document IDs, replace existing document with imported document
	--allow-failing-assets # Skip assets that cannot be fetched/uploaded
	--replace-assets # Skip reuse of existing assets

# Example
	sanity dataset import ./new-data.ndjson --replace

# Discover more options
	sanity help dataset import
```
