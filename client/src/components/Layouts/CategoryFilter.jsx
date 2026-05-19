const MAKEUP_CATEGORIES = [
  { label: "All",          slug: null          },
  { label: "Lipstick",     slug: "lipstick"    },
  { label: "Eye Makeup",   slug: "eye-makeup"  },
  { label: "Foundation",   slug: "foundation"  },
  { label: "Skincare",     slug: "skincare"    },
  { label: "Highlighter",  slug: "highlighter" },
  { label: "Setting Spray",slug: "setting-spray"},
  { label: "Concealer",    slug: "concealer"   },
];

const CategoryFilter = ({ activeSlug, onChange }) => (
  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4 md:px-0">
    {MAKEUP_CATEGORIES.map((cat) => (
      <button
        key={cat.label}
        onClick={() => onChange(cat.slug)}
        className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
          activeSlug === cat.slug
            ? "bg-[#8E1C9D] text-white shadow-md"
            : "bg-white border border-gray-200 text-gray-700 hover:border-[#8E1C9D] hover:text-[#8E1C9D]"
        }`}
      >
        {cat.label}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
