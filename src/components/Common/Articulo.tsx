export function Articulo({ info }) {
  console.log(info)
  return (
    <>
      <article className="bg-gray-50 p-5 rounded-md cursor-pointer hover:bg-gray-100 hover:outline-red-400 hover:shadow-lg">
        <section>
          <img width='100%' src={info.urlToImage} alt="" />
        </section>
        <section>
          <h2 style={{textTransform:"uppercase"}}><strong>{info.title}</strong></h2>
          <p>{info.description}</p>
        </section>
        <footer>
          {info.publishedAt}
        </footer>
      </article>
    </>
  )
}