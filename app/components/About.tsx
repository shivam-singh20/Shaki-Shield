'use client';

export default function About() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Shakti Shield
          </h1>
          <p className="text-xl text-gray-400">
            Empowering women through innovative safety technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Shakti Shield was born from a vision to create a safer world for women everywhere. 
              We believe that technology should serve as a protective force, providing instant access 
              to help when it's needed most.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our platform combines cutting-edge technology with intuitive design to deliver 
              life-saving features that work seamlessly in critical moments.
            </p>
          </div>
          <div 
            className="h-80 rounded-xl bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20female%20developer%20working%20on%20safety%20technology%20application%2C%20modern%20workspace%20with%20multiple%20monitors%20showing%20code%20and%20safety%20app%20interfaces%2C%20empowering%20tech%20environment%20with%20purple%20and%20pink%20lighting%20accents%2C%20inspiring%20and%20innovative%20atmosphere%2C%20high-tech%20development%20setup&width=600&height=400&seq=mission1&orientation=landscape')`,
            }}
          />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Meet the Developer</h2>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-400">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20confident%20female%20software%20developer%2C%20modern%20headshot%20with%20purple%20and%20pink%20lighting%2C%20tech%20industry%20professional%2C%20empowering%20expression%2C%20clean%20background%20with%20subtle%20tech%20elements%2C%20inspiring%20and%20approachable%20personality&width=300&height=300&seq=developer1&orientation=squarish')`,
                }}
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Sarah Chen</h3>
              <p className="text-purple-400 text-lg font-semibold mb-4">Lead Developer & Founder</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Background</h4>
                <p className="text-gray-300 mb-4">
                  With over 8 years of experience in full-stack development, Sarah specializes in 
                  creating secure, user-centric applications. She holds a Master's degree in 
                  Computer Science from Stanford University.
                </p>
                <p className="text-gray-300">
                  Previously worked at leading tech companies including Google and Meta, 
                  focusing on safety and security technologies.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Vision</h4>
                <p className="text-gray-300 mb-4">
                  "Having experienced safety concerns myself, I understand the importance of 
                  having reliable protection. Shakti Shield represents my commitment to using 
                  technology as a force for women's empowerment."
                </p>
                <p className="text-gray-300">
                  Sarah is passionate about creating solutions that make a real difference 
                  in people's lives, especially in critical safety situations.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <h4 className="text-xl font-semibold text-white mb-4">Technical Expertise</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                    <i className="ri-reactjs-line text-2xl text-blue-400"></i>
                  </div>
                  <span className="text-sm text-gray-300">React</span>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                    <i className="ri-nodejs-line text-2xl text-green-400"></i>
                  </div>
                  <span className="text-sm text-gray-300">Node.js</span>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                    <i className="ri-database-2-line text-2xl text-orange-400"></i>
                  </div>
                  <span className="text-sm text-gray-300">Firebase</span>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                    <i className="ri-shield-check-line text-2xl text-purple-400"></i>
                  </div>
                  <span className="text-sm text-gray-300">Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
            <p className="text-gray-300 mb-6">
              Have questions about Shakti Shield or want to contribute to women's safety technology?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
                  <i className="ri-mail-line"></i>
                </div>
                Contact Developer
              </button>
              <button className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
                  <i className="ri-github-line"></i>
                </div>
                View on GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}