export default function DefaultComponentContainer({ content }: { content: string }) {
    return (
      <div className="min-h-screen max-w-4xl mx-auto flex items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          {content}
        </h2>
      </div>
    )
  }