export function shouldHide(d: any) {
  if (d?.source?.data?.hide || d?.target?.data?.hide || d?.data?.hide) {
    return 'none';
  } else return 'block';
}
