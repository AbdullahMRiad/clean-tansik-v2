<p align="center"><a href="./README.md">النسخة العربية هنا</a></p>

<img src="./public/og-image.png">

# College Admission Results for the Equivalency of the Saudi Arabian Certificate 2024

A simple and fast website to view the Egyptian university admission results for the Saudi high school certificate in 2024, separated by boys and girls. It supports quick search and filtering by school grade and Saudi GAT score.

🔗 **Live site:** [tansik-v2.vercel.app](https://tansik-v2.vercel.app)

---

## 📌 What does the site offer?

* Displays admission data separately for boys and girls
* Instant search across all colleges
* Ability to filter results based on school score and Saudi GAT score
* Simple and responsive design for all devices

---

## 📱 How to use

1. Open the site: [tansik-v2.vercel.app](https://tansik-v2.vercel.app)
2. Choose either "boys" or "girls" from the top
3. Use the search bar to find the college you want  
   - You can also filter colleges by your school score and Saudi GAT score (enter a value between 0 and 100)

---

## 🛠️ How was the site made?

* Boys' data was extracted from:  
  [https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648773](https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648773)
* Girls' data from:  
  [https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648786](https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648786)
* The text was processed using [RegExr](https://regexr.com) with the pattern:  
  `/([^\n]+?)\s+(\d+\.\d{6})/g`
* Matches were exported as JSON
* The data was cleaned using a Python script into `b_clean_data.json` and `g_clean_data.json`
* The website’s structure was rewritten to look as good as it can be using Tailwind CSS

---

## 💡 Have a suggestion?

You can:

* Raise an [Issue on GitHub](https://github.com/AbdullahMRiad/clean-tansik/issues/new)
* Or contact me on Telegram: [@AbdullahMRiad](https://t.me/AbdullahMRiad)
* The code is open source and contributions via Pull Requests are welcome

---

## 💻 How to run the website

1. Clone using `git clone https://www.github.com/AbdullahMRiad/clean-tansik-v2`
2. Install dependencies with `npm install`
3. From here, you can:
  - Run the development server with `npm run dev` (supports hot reload)
  - Build and run the website with `npm run build` then `npm run preview`
  - Deploy it to Vercel by running `npm i -g vercel` then `vercel` (free with sign up required)