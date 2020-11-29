import React, {useEffect, useState} from 'react';
import {Counter} from "./components/Counter";
import './App.css';
import {IArticle} from "./models/article";
import {articles$} from "./services/articles";

function App() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const sub = articles$.subscribe((value) => {
      console.log('article', value);
      setArticles(v => [...v, value]);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [])
  return (
    <div>
      <table>
        <tr>
          <td>
            <Counter />
            <Counter step={2} />
          </td>
          <td>
            <ol>
              {articles.map(article => (
                <li key={article.id}>
                  {article.name}
                </li>
              ))}
            </ol>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
