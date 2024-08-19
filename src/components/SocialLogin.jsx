import { AuthService } from '../services'

export function SocialLogin() {
  async function signinTo(social) {
    try {
      const url = await AuthService.oauth(social)
      window.location.href = url
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex gap-5 justify-center">
      <img src="" alt="Facebook" />
      <button onClick={() => signinTo('github')}>
        <img src="" alt="GitHub" />
      </button>
      <img src="" alt="Google" />
      <img src="" alt="Twitter" />
    </div>
  )
}

