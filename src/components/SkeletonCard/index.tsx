import ContentLoader, {
  Rect,
  IContentLoaderProps
} from 'react-content-loader/native';

export function SkeletonCard({ ...props }: IContentLoaderProps) {
  const numberOfCards = 10;

  return (
    <>
      {Array.from(Array(numberOfCards).keys()).map((index) => (
        <ContentLoader
          key={index}
          speed={3}
          width={300}
          height={120}
          viewBox="0 0 300 120"
          backgroundColor="#949494"
          foregroundColor="#ffffff"
          {...props}>
          <Rect x="5" y="11" rx="6" ry="6" width="159" height="25" />
          <Rect x="7" y="58" rx="6" ry="6" width="120" height="33" />
          <Rect x="214" y="12" rx="6" ry="6" width="72" height="25" />
          <Rect x="199" y="64" rx="6" ry="6" width="86" height="25" />
        </ContentLoader>
      ))}
    </>
  );
}
