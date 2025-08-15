import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="w-full  sticky items-center top-0 flex justify-end pt-3 pb-1 px-3 backdrop-blur-sm   z-10 text-white">
      <ul className="flex gap-10 ">
        <li>
          {" "}
          <Button variant="link" className="text-white cursor-pointer">
            Home
          </Button>
        </li>
        <li>
          {" "}
          <Button variant="link" className="text-white cursor-pointer">
            About
          </Button>
        </li>
        <li>
          {" "}
          <Button variant="link" className="text-white cursor-pointer">
            Skills
          </Button>
        </li>
        <li>
          {" "}
          <Button variant="link" className="text-white cursor-pointer">
            Projects
          </Button>
        </li>
        <li>
          {" "}
          <Button variant="link" className="text-white cursor-pointer">
            Contact
          </Button>
        </li>
      </ul>
    </div>
  );
}
