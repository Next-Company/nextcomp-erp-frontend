export function Articulo({ info }) {
  console.log(info)
  return (
    <>
      <article className="bg-gray-50 p-5 rounded-md">
        <section>
          <h2><strong>{info.title}</strong></h2>
          <img width='100%' src={info.urlToImage} alt="" />
        </section>
        <section>
          <p>{info.description}</p>
        </section>
        <footer>
          {info.publishedAt}
        </footer>
      </article>
    </>
  )
}