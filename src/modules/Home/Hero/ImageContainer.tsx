function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl object-cover shadow-lg aspect-[2/3]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
    </div>
  );
}

const ImageContainer = () => {
  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      {/* ColumnOne */}
      <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
        <Image
          src="https://images.unsplash.com/photo-1563302905-4830598613c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFza2V0YmFsbCUyMGNvdXJ0fGVufDB8fDB8fHww"
          alt="Basketball court"
        />
      </div>
      {/* ColumnTwo */}
      <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1509027572446-af8401acfdc3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhc2tldGJhbGwlMjBjb3VydHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Basketball court with a view"
          />
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbCUyMHBsYXllcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Shooting hoops"
          />
        </div>
      </div>
      {/* ColumnThree */}
      <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbCUyMHBsYXllcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Court with a view"
          />
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFza2V0YmFsbCUyMG5pa2V8ZW58MHx8MHx8fDA%3D"
            alt="Basketball court"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
