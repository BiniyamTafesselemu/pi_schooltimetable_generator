import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsTelegram, BsYoutube, BsLinkedin, BsMailbox } from "react-icons/bs";

export function FooterComponent() {
  return (
    <Footer>
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://www.softnetsc.com/#about">About</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="help center" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://www.instagram.com/softnet2023?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D">Instagram</Footer.Link>
              <Footer.Link href="https://www.linkedin.com/company/softnet-sc/">Linked in</Footer.Link>
              <Footer.Link href="https://www.facebook.com/softnetsc?mibextid=ZbWKwL">Facebook</Footer.Link>
              <Footer.Link href="https://t.me/SimsallEt">Telegram</Footer.Link>
              <Footer.Link href="mailto:info@softnetsc.com">Email</Footer.Link>
              <Footer.Link href="https://www.softnetsc.com/#google-map">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://www.softnetsc.com/#">Privacy Policy</Footer.Link>
              <Footer.Link href="https://www.softnetsc.com/#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-[#8c79ba] px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="https://www.softnetsc.com/" by="Softnet solutions™" year={2024} className="text-[#E9F0CD]"/>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/softnetsc?mibextid=ZbWKwL" icon={BsFacebook} className="text-[#E9F0CD]"/>
            <Footer.Icon href="https://www.instagram.com/softnet2023?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" icon={BsInstagram} className="text-[#E9F0CD]"/>
            <Footer.Icon href="https://www.linkedin.com/company/softnet-sc/" icon={BsLinkedin} className="text-[#E9F0CD]"/>
            <Footer.Icon href="https://t.me/SimsallEt" icon={BsTelegram} className="text-[#E9F0CD]"/>
            <Footer.Icon href="https://www.youtube.com/@softnetsolutions" icon={BsYoutube} className="text-[#E9F0CD]"/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
