# プロジェクトのクローン方法

（パワーシェルではなく）コマンドプロンプトを使う。  

* コピー元のプロジェクトについて
    * コピー元のプロジェクトをクリーンする。
    * 📁 `.git` と、 📁 `node_modules` フォルダー以外を丸ごとコピー。
* 新しいプロジェクト用のフォルダーを作る
    * `git init`
    * `git add .`
    * `git commit -m "Initial commit"`
    * あとは Git Hub に新しいリポジトリーを作成、そこの指示に従う。つまり：
        * `git remote add origin https://github.com/muzudho/＜リポジトリー名＞.git`
        * `git branch -M main`
        * `git push -u origin main`
