import { Button } from "@/components/ui/button";

export default function AboutMeDesc() {
  return (
    <div className="flex flex-col gap-6 items-end">
      <p>
        Hi, I&apos;m Kaleab - but you can call me <b>Kal_X. </b> I&apos;m a
        passionate <b>aspiring web designer</b> with strong background in
        <b> full-stack development</b>. My mission is simple: create web
        experiances that are visually striking, easy to use, and technically
        robust.
        <hr className="border-transparent mt-3" />I started as a developer,
        mastering the <b>MERN Stack</b>, but my curiosity for{" "}
        <b>UI/UX design</b> led me to explore typography, color theory, and
        layout composition. Now I combine <b>Design sensibility</b> with{" "}
        <b>Technical skill</b> to deliver websites that don&apos;t just work -
        they <i>standout.</i>
      </p>
      <Button>Contact me</Button>
    </div>
  );
}
