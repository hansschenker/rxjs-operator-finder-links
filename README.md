
# rxjs-operator-finder

A tiny web app to locate RxJS operators by **order** (first/higher), **time/value**, and **further** semantics.
This is thought to help users to find the right RxJS operator for their use case.
## Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Data
- Edit `src/data/operators.json` to adjust/add operators or labels.
- The UI only allows dropdown values that exist in the dataset columns.

## Filter logic
- Results appear once **order** and **time/value** are selected.
- **further** is optional; if set, it narrows results.
- The **Further** dropdown dynamically narrows to values available for the chosen (order, time/value) combo.

## Ship to GitHub
```bash
git init
git add .
git commit -m "feat: rxjs operator finder"
git branch -M main
git remote add origin git@github.com:<YOUR_USERNAME>/rxjs-operator-finder.git
git push -u origin main
```

## License
MIT
